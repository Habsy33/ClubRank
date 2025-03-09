// Color constants for the app
export const Colors = {
  // Primary colors
  primary: {
    red: '#FF5E62',
    orange: '#FF5733',
    lightRed: '#FDE7E8',
  },
  
  // Rating colors
  rating: {
    high: '#4CAF50',    // Green for ratings >= 8
    medium: '#FFC107',  // Yellow for ratings >= 5
    low: '#F44336',     // Red for ratings < 5
  },

  // Text colors
  text: {
    red: '#E65C4F',
    error: '#FF0000',
    warning: '#FFA726',
  },

  // Background colors
  background: {
    redLight: 'rgba(255, 119, 34, 0.28)',
    redFaded: '#FFDAB9',
  },

  // Border colors
  border: {
    red: '#FF5E62',
  },
};

// Helper function to get rating color based on value
export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return Colors.rating.high;
  if (rating >= 5) return Colors.rating.medium;
  return Colors.rating.low;
}; 