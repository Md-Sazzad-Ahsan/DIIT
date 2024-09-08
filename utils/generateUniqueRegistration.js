function generateUniqueRegistration() {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    const randomPrefix = 'random';
    return `${randomPrefix}${randomNumber}`;
}

export default generateUniqueRegistration;