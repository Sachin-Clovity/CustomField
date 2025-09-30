import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Button, Box, Stack } from '@forge/react';
import { invoke } from '@forge/bridge';
import CreateFieldModal from './Modal'; 
// import BaselineModal from './Modal.Baseline'; // optional minimal modal

// Logging helper
const log = (msg, extra) => {
  if (extra !== undefined) {
    console.log(`[APP] ${msg}`, extra);
  } else {
    console.log(`[APP] ${msg}`);
  }
};

const App = () => {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  log('render start (App)');

  // Fetch initial data from backend
  useEffect(() => {
    log('useEffect -> invoke(getText) start');
    invoke('getText', { example: 'my-invoke-variable' })
      .then((res) => {
        log('invoke(getText) resolved', res);
        setData(res);
      })
      .catch((err) => {
        console.error('[APP] invoke(getText) ERROR', err);
        setData('Error fetching');
      });
  }, []);

  // Modal handlers
  const open = () => {
    log('open modal click');
    setIsOpen(true);
  };

  const close = () => {
    log('close modal');
    setIsOpen(false);
  };

  const handleNext = (selectedId) => {
    log('onNext from modal', { selectedId });
    close();
  };

  log('render end (App)');

  return (
    <Box padding="space.400">
      {/* Page heading */}
      <Stack space="space.200">
        <Text weight="bold" size="xlarge">Jira Field</Text>
        <Text size="medium" tone="subtle">Welcome to Custom Fields</Text>
      </Stack>

      {/* Info text */}
      <Box marginTop="space.300">
        <Text>{data ?? 'Loading...'}</Text>
      </Box>

      {/* Launcher button */}
      <Box marginTop="space.400">
        <Button appearance="primary" onClick={open}>
          Create Custom Field
        </Button>
      </Box>

      {/* Modal */}
      <CreateFieldModal 
        isOpen={isOpen} 
        onClose={close} 
        onNext={handleNext} 
      />

      {/*
        If you need to isolate issues, swap to the baseline modal:
        <BaselineModal isOpen={isOpen} onClose={close} onNext={handleNext} />
      */}
    </Box>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
