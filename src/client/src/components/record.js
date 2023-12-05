import React, { useState, useEffect, Component,  } from 'react';
import '../style.css';
import '../play.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import MicRecorder from 'mic-recorder-to-mp3';
import { useAuthContext } from '../hooks/useAuthContext';
import Geocode from "react-geocode";

Geocode.setRegion("ie");
Geocode.setLocationType("ROOFTOP");
Geocode.setApiKey("AIzaSyBHgkUVDauI5jiTsixDWhsI1waXDwCb6fc");



const AUDIO_LENGTH = 7 * 1000; // x seconds converted to ms
const INTERVAL_LENGTH = 30 * 1000;

export const Record = () => {
    
    const { user } = useAuthContext()

    const [blobURL, setBlobURL] = useState({}); //(for testing)
    const [isRecording, setIsRecording] = useState(false);
    const [audioRecorder, setAudioRecorder] = useState(null);
    const [songData, setSongData] = useState({});


    const start = async () => {
        if (audioRecorder) {
            try {
              await audioRecorder.start();
              await sleep(AUDIO_LENGTH); // record for amount of time set
              audioRecorder.stop().getMp3().then(([buffer, blob]) => {
                const audioFile = new File(buffer, 'song.mp3', {
                type: blob.type,
                lastModified: Date.now()
                })
                
                apiCall(audioFile)
            });
            } catch (error) {
                console.error('Error recording audio:', error);
            }
        } else {
            
            const recorder = new MicRecorder({ bitRate: 128 });
            setAudioRecorder(recorder);

            try {
                await recorder.start();
                await sleep(AUDIO_LENGTH); // record for amount of time set
                if (isRecording){
                    recorder.stop().getMp3().then(async ([buffer, blob]) => {
                        const audioFile = new File(buffer, 'song.mp3', {
                        type: blob.type,
                        lastModified: Date.now()
                        })
                        
                        apiCall(audioFile)
                    });
                }
              } catch (error) {
                  console.error('Error recording audio:', error);
              }
        }
        
        const interval = setInterval(async () => {
            const recorder = new MicRecorder({ bitRate: 128 });
            setAudioRecorder(recorder);

            try {
                await recorder.start();

                await sleep(AUDIO_LENGTH); // Wait before stoppng recording

                recorder.stop().getMp3().then(async ([buffer, blob]) => {
                    const audioFile = new File(buffer, 'song.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                    })
                    
                    apiCall(audioFile)
                });
            } catch (error) {
                console.error('Error recording audio:', error);
            }
        }, INTERVAL_LENGTH);

        return interval;
    };

    const stop = async (interval) => {
        clearInterval(interval);

        if (isRecording && audioRecorder) {
            try {
                // Stop recording, save audio to file and pass to API
                audioRecorder.stop().getMp3().then(async ([buffer, blob]) => {
                    
                    const audioFile = new File(buffer, 'song.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                    })

                    apiCall(audioFile)

                })
            } catch (error) {
                console.error('Error stopping audio recording:', error);
            }
            setAudioRecorder(null);
        }
    };

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    useEffect(() => {
        let interval;

        if (isRecording) {
            start().then((id) => {
             interval = id;
         });
        } else {
            stop(interval);
        }

        return () => stop(interval);
    }, [isRecording]);
    
    function changeButton() {
        // Change recording state to change the button shown
        setIsRecording((prevIsRecording) => !prevIsRecording);
    }

    async function apiCall(audioFile) {
        try {
            // Get location data and store town and city names in 'location' variable as string
            try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const coords = await Geocode.fromLatLng(lat, lng);
            const address = coords.results[0].address_components;

            var location = address[2].long_name + ', ' + address[3].long_name;
        }  catch (error) {
            // If there's any issue getting location (i.e gps disabled) set to none
            var location = 'None'
        }
            //const location = "test";

            // Make call to API to get song data
            const formData = new FormData();
            formData.append('audio', audioFile);
            formData.append('userId', user.email);
            formData.append('location', location);
            console.log(formData)

            const response = await fetch('/api/song', {
                method: 'POST',
                headers: { 'authorisation': `Bearer ${user.token}` },
                body: formData,
            });

            const json = await response.json()
            
            if (response.ok) {
                setSongData(json);

                console.log(json.title)
            } else {
                console.log(response)
            }
        } catch (error) {
            console.error('Error getting song:', error)
        }
    }
    

    return (
    <div>
        
        <div className="recordBtn">
        {isRecording ? (
        <div className='Listening'>
            <button className="Stopbtn" onClick={function(event){changeButton(); stop()}}>
            <FontAwesomeIcon icon={faStop} size="7x" />
            </button>
        </div>
        ) : (
        <div className="off">
            <button className="Startbtn" onClick={function(event){changeButton()}}>
            <FontAwesomeIcon icon={faPlay} size="7x" />
            </button>
        </div>
        ) }
        </div>

        {songData.title && (
        <div className="currentlyPlaying">
          <p>Currently playing: </p>
          <p><b>{songData.title}&nbsp;</b> by <b>&nbsp;{songData.artist}</b></p>
        </div>
      )}
    </div>
    );
}