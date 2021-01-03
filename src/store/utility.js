export const updateObject = (oldState, updatedProperty) => {
    return {
        ...oldState,
        ...updatedProperty
    }
};