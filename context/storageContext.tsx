import React, {createContext, useContext} from 'react';
import {FirebaseContext} from './firebaseContext';
import firebase from 'firebase/app';
import {Toast} from 'native-base';


type StorageContextType = {
    upload: (
        file: Blob,
        onComplete: (downloadURL: string) => void,
        onProgress?: (progress: number, status: Status) => void,
        onError?: (error: Error) => void) => void;
    deleteImage: (imageName: string) => Promise<void>;
};

export enum Status {
    INIT,
    RUNNING,
    PAUSED,
    ERROR,
    SUCCESS
}

// @ts-ignore
export const StorageContext = createContext<StorageContextType>();

const StorageProvider: React.FC<React.ReactNode> = ({children}) => {
    const {storageRef, imageRef} = useContext(FirebaseContext);

    const upload: (file: Blob,
                   onComplete: (downloadURL: string) => void,
                   onProgress?: (progress: number, RUNNING: Status) => void,
                   onError?: (error: Error) => void,
    ) => void =
        async (file: Blob,
            onComplete: (imageName: string) => void,
            onProgress?: (progress: number, RUNNING: Status) => void,
            onError?: (error: Error) => void) => {
            if (onProgress) {
                onProgress(0, Status);
            }
            try {
                const uploadTask = storageRef.child(`images/${Date.now().toString()}`).put(file);
                const unsubscribe = uploadTask.on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                        switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            if (onProgress) {
                                onProgress(progress, Status.PAUSED);
                            }
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            if (onProgress) {
                                onProgress(progress, Status.RUNNING);
                            }
                            break;
                        }
                    }, (error) => {
                        console.error({error});
                        if (onError) {
                            onError(error);
                        }
                        if (onProgress) {
                            onProgress(0, Status.ERROR);
                        }
                        unsubscribe();
                    }, () => {
                        uploadTask.snapshot.ref.getMetadata().then((metadata) => {
                            onComplete(metadata['name']);
                            if (onProgress) {
                                onProgress(100, Status.SUCCESS);
                            }
                            unsubscribe();
                        });
                    });
            } catch (e) {
                console.error(e.message);
                Toast.show({text: e.message, type: 'danger'});
                throw e;
            }
        };


    const deleteImage: (imageName: string) => Promise<void> =
        async (imageName: string): Promise<void> => {
            const basePath = 'images/';
            const subPath = `${basePath}thumbs/`;
            try {
                await imageRef(`${basePath}${imageName}`).delete();
                await imageRef(`${subPath}${imageName}_400x300`).delete();
                await imageRef(`${subPath}${imageName}_80x60`).delete();
            } catch (e) {
                console.error(e.message);
                Toast.show({text: e.message, type: 'danger'});
                throw e;
            }
        };

    return (
        <StorageContext.Provider value={{upload, deleteImage}}>
            {children}
        </StorageContext.Provider>
    );
};

export default StorageProvider;

