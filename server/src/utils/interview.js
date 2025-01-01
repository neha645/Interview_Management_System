export const moveNextLevel = (current, levels = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C']) => {
    // Input validation
    if (!levels.includes(current)) {
        throw new Error('Invalid current level');
    }

    // Find and return next level
    const currentIndex = levels.indexOf(current);
    return levels[currentIndex + 1] || current;
}