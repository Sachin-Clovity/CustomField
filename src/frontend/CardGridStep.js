import React from 'react';
import { Box, Inline, Button, Textfield, SectionMessage } from '@forge/react';
import FieldCard from './FieldCard';

const CardGridStep = ({
  categories,
  active,
  setActive,
  query,
  setQuery,
  filtered,
  onCardSelect,
}) => {
  return (
    <>
      {/* Tabs + search */}
      <Inline gap="space.100" shouldWrap>
        {categories.map((name) => (
          <Button
            key={name}
            appearance={active === name ? 'primary' : 'subtle'}
            onClick={() => {
              console.log('[CARD-GRID] category clicked:', name);
              setActive(name);
            }}
          >
            {name}
          </Button>
        ))}
        <Box>
          <Textfield
            placeholder="Search"
            value={query}
            onChange={(e) => {
              console.log('[CARD-GRID] search change:', e.target.value);
              setQuery(e.target.value);
            }}
            aria-label="Search custom fields"
          />
        </Box>
      </Inline>

      {/* Card grid */}
      <Box padding="space.200">
        {filtered.length === 0 ? (
          <SectionMessage title="No results" appearance="information">
            Try a different category or search term.
          </SectionMessage>
        ) : (
          <Inline gap="space.200" shouldWrap>
            {filtered.map((c) => (
              <FieldCard
                key={c.id}
                id={c.id}
                title={c.title}
                desc={c.desc}
                category={c.category}
                selected={false}
                onSelect={() => {
                  console.log('[CARD-GRID] card clicked:', c);
                  onCardSelect(c);
                }}
              />
            ))}
          </Inline>
        )}
      </Box>
    </>
  );
};

export default CardGridStep;
