'use client';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
} from '@chakra-ui/react';
// import Image from 'next/image';

export default function Home() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [file, setFile] = useState(null);
  const [isAudioUpload, setIsAudioUpload] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select an audio file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('audio', file);

    try {
    } catch (error) {}
  };

  const handleFormChange = () => {};

  const handleSubmit = async (e) => {
    //if transcript execute transcript webspeech logic
    //if file upload execute file logic with gemini
    e.preventDefault();
    // Handle form submission logic
    const formData = new FormData();
    // formData.append('text', text);
    // formData.append('file', file);
    // debugger;

    const speech = new SpeechSynthesisUtterance(text);

    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);

    // try {
    //   const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   const data = await response.json();
    //   console.log('Upload successful:', data);
    // } catch (error) {
    //   console.error('Error uploading:', error);
    // }
  };

  return (
    <Box maxW='md' mx='auto' mt={8} p={4} borderWidth={1} borderRadius='md'>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Button onClick={() => setIsAudioUpload(false)}>
            Enter transcript
          </Button>
          <Button onClick={() => setIsAudioUpload(true)}>Upload Audio</Button>
          {isAudioUpload ? (
            <>
              <FormControl id='file' isRequired>
                <FormLabel>File Upload</FormLabel>
                <Input
                  type='file'
                  onChange={handleFileChange}
                  accept='audio/*' // Restrict file types if needed
                />
              </FormControl>
              <Button
                type='submit'
                colorScheme='blue'
                w='full'
                disabled={isSpeaking}
              >
                Generate Podcast
              </Button>
            </>
          ) : (
            <>
              <FormControl id='text' isRequired>
                <FormLabel>Text Input</FormLabel>
                <Textarea
                  placeholder='Enter your text here'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </FormControl>
              <Button
                type='submit'
                colorScheme='blue'
                w='full'
                disabled={isSpeaking}
              >
                {isSpeaking ? 'Speaking...' : 'Speak'}
              </Button>
            </>
          )}
        </VStack>
      </form>
    </Box>
  );
}
