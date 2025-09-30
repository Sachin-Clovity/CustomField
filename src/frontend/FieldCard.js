import React from 'react';
import { Box, Text, Stack, Button } from '@forge/react';

// Category accent colors
const categoryColors = {
  Number: 'color.background.discovery.bold',
  Progress: 'color.background.success.bold',
  Picker: 'color.background.accent.bold',
  Prioritization: 'color.background.warning.bold',
  Other: 'color.background.neutral.bold',
};

const FieldCard = ({ id, title, desc, category, selected, onSelect }) => {
  return (
    <Box
      padding="space.300"
      backgroundColor={
        selected
          ? 'color.background.selected'
          : 'color.background.neutral.subtle'
      }
      borderRadius="medium"
      shadow="elevation.shadow.overlay"
      style={{
        minWidth: '220px',
        maxWidth: '260px',
        flexGrow: 1,
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <Stack space="space.150">
        {/* Category pill */}
        <Box
          padding="space.050"
          borderRadius="small"
          backgroundColor={categoryColors[category] || 'color.background.neutral.bold'}
          style={{ display: 'inline-block', alignSelf: 'flex-start' }}
        >
          <Text size="xsmall" weight="bold" color="color.text.inverse">
            {category}
          </Text>
        </Box>

        {/* Title */}
        <Text weight="bold">{title}</Text>

        {/* Description */}
        <Text size="small" tone="subtle">
          {desc}
        </Text>

        {/* Small action button */}
       <Button
          appearance="subtle"
          spacing="compact"
          onClick={() => onSelect(id)}   // ✅ no stopPropagation
        >
          Select
        </Button>
      </Stack>
    </Box>
  );
};

export default FieldCard;
