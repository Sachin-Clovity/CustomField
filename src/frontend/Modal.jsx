import React, { useMemo, useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
    ModalTransition,
    Inline,
} from '@forge/react';
import CardGridStep from './CardGridStep';
import ConfigFormStep from './ConfigFormStep';

const CATEGORIES = ['All', 'Number', 'Progress', 'Picker', 'Prioritization', 'Other'];

const ALL_CARDS = [
    { id: 'shoppi', title: 'Shoppie', desc: 'Shopping Experience in JSM', category: 'Other' },
    { id: 'linksy', title: 'Linksy', desc: 'Effortless Linking in Jira', category: 'Picker' },
    { id: 'moscow', title: 'MoSCoW Prioritization', desc: 'Prioritize by business value', category: 'Prioritization' },
    { id: 'progressbar', title: 'Progress Bar', desc: 'Visualize completion', category: 'Progress' },
    { id: 'numfield', title: 'Advanced Number', desc: 'Formatted numeric input', category: 'Number' },
    // ... rest of your 35 cards
];

const CreateFieldModal = ({ isOpen, onClose, onNext }) => {
    const [active, setActive] = useState('All');
    const [query, setQuery] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);
    const [fieldName, setFieldName] = useState('');
    const [fieldDesc, setFieldDesc] = useState('');

    console.log('[MODAL] render', { isOpen, active, query, selectedCard, fieldName, fieldDesc });

    const filtered = useMemo(() => {
        const inTab = (c) => active === 'All' || c.category === active;
        const inSearch = (c) =>
            !query ||
            c.title.toLowerCase().includes(query.toLowerCase()) ||
            c.desc.toLowerCase().includes(query.toLowerCase());
        const result = ALL_CARDS.filter((c) => inTab(c) && inSearch(c));
        console.log('[MODAL] filtered cards:', result.length);
        return result;
    }, [active, query]);

    const resetAndClose = () => {
        console.log('[MODAL] resetAndClose');
        setSelectedCard(null);
        setQuery('');
        setActive('All');
        setFieldName('');
        setFieldDesc('');
        onClose();
    };

    const handleCardSelect = (card) => {
        console.log('[MODAL] card selected:', card);
        setSelectedCard(card);
    };

    const handleCreate = () => {
        console.log('[MODAL] create clicked', {
            id: selectedCard.id,
            type: selectedCard.title,
            name: fieldName,
            desc: fieldDesc,
        });
        onNext?.({
            id: selectedCard.id,
            type: selectedCard.title,
            name: fieldName,
            desc: fieldDesc,
        });
        resetAndClose();
    };

    return (
        <ModalTransition>
            {isOpen && (
                <Modal onClose={resetAndClose} width="x-large">
                    <ModalHeader>
                        <ModalTitle>
                            {!selectedCard
                                ? 'Create Custom Field'
                                : `Configure "${selectedCard.title}" Field`}
                        </ModalTitle>
                    </ModalHeader>

                    <ModalBody>
                        {!selectedCard ? (
                            <CardGridStep
                                categories={CATEGORIES}
                                active={active}
                                setActive={setActive}
                                query={query}
                                setQuery={setQuery}
                                filtered={filtered}
                                onCardSelect={handleCardSelect}
                            />
                        ) : (
                            <ConfigFormStep
                                isOpen={isOpen}
                                onClose={resetAndClose}
                                onBack={() => setSelectedCard(null)}
                                onCreate={handleCreate}
                                selectedCard={selectedCard}
                                fieldName={fieldName}
                                setFieldName={setFieldName}
                                fieldDesc={fieldDesc}
                                setFieldDesc={setFieldDesc}
                            />
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Inline gap="space.100">
                            <Button appearance="subtle" onClick={resetAndClose}>
                                Cancel
                            </Button>
                            {selectedCard && (
                                <Button
                                    appearance="subtle"
                                    onClick={() => {
                                        console.log('[MODAL] back clicked');
                                        setSelectedCard(null);
                                    }}
                                >
                                    Back
                                </Button>
                            )}
                            {selectedCard && (
                                <Button
                                    appearance="primary"
                                    onClick={handleCreate}
                                    isDisabled={!fieldName}
                                >
                                    Create
                                </Button>
                            )}
                        </Inline>
                    </ModalFooter>
                </Modal>
            )}
        </ModalTransition>
    );
};

export default CreateFieldModal;
