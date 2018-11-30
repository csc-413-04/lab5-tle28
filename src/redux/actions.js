export const doTest = () => ({
    type: 'SET_TEST',
    test: 'some text',
});
export const loadAllMessages = (messages) => ({
    type: 'LOAD_MESSAGE',
    messages,
});
export const importMessage = (message) => ({
    type: 'IMPORT_MESSAGE',
    message,
});