export default function decodeJWT(token) {
    const base64UrlToBase64 = (input) => {
      // Replace characters according to base64url specifications
      const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
      // Pad with "=" characters
      const padLength = (4 - (base64.length % 4)) % 4;
      const paddedBase64 = base64.padEnd(base64.length + padLength, '=');
      return paddedBase64;
    };
  
    const base64UrlDecode = (str) => {
      // Convert from base64url to base64 and decode
      return decodeURIComponent(atob(base64UrlToBase64(str)).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    };
  
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT is not correctly formatted');
    }
  
    const payload = parts[1];
    return JSON.parse(base64UrlDecode(payload));
  }
  