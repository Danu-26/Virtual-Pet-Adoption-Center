function calculateMood(createdAt) {
    const now = new Date();
    const diffDays = (now - new Date(createdAt)) / (1000 * 60 * 60 * 24);

    if (diffDays < 1) return 'Happy';
    if (diffDays <= 3) return 'Excited';
    return 'Sad';
}

module.exports = { calculateMood };
