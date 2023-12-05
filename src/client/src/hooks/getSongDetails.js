//import { useState } from "react";

export const getSongDetails = () => {
    //const [songError, setSongError] = useState(null)

    const songDetails = async (audioFile, userId, location) => {
        // In case of previous error, make sure to reset to null
        //setSongError(null)

        const formData = new FormData();
        formData.append('audio', audioFile);
        formData.append('userId', userId);
        formData.append('location', location);

        const response = await fetch('/songs/saveSong', {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: formData,
        });

        const json = await response.json()

        // If resonse is not successful, set error
       // if (!response.ok) {
       //     setSongError(json.error)
       // }
        // If reponse is successful
        if (response.ok) {
            
            return json;
        }
    }

    return { songDetails }
}