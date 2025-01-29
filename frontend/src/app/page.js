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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    //if transcript execute transcript webspeech logic
    //if file upload execute file logic with gemini
    e.preventDefault();
    // Handle form submission logic
    const formData = new FormData();
    formData.append('text', text);
    // formData.append('file', file);
    debugger;

    const speech = new SpeechSynthesisUtterance(text);

    speech.onstart = () => setIsSpeaking(true);
    speech.onstart = () => setIsSpeaking(true);

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
          {/* show if transcript button is active */}
          <FormControl id='text' isRequired>
            <FormLabel>Text Input</FormLabel>
            <Textarea
              placeholder='Enter your text here'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FormControl>
          {/* show if upload button is active */}
          {/* <FormControl id='file' isRequired>
            <FormLabel>File Upload</FormLabel>
            <Input
              type='file'
              onChange={handleFileChange}
              accept='.png, .jpg, .jpeg, .pdf' // Restrict file types if needed
            />
          </FormControl> */}

          <Button
            type='submit'
            colorScheme='blue'
            w='full'
            disabled={isSpeaking}
          >
            {isSpeaking ? 'Speaking...' : 'Speak'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
