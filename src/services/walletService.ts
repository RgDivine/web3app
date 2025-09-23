import QRCode from 'qrcode';

export class WalletService {
  // Generate a new wallet address (simplified for demo)
  static generateWalletAddress(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 44; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Generate QR code for wallet address
  static async generateQRCode(address: string): Promise<string> {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(address, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      return qrCodeDataURL;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return '';
    }
  }

  // Validate wallet address format
  static validateAddress(address: string): boolean {
    // Basic validation - in real app, use proper validation for each blockchain
    return address.length >= 26 && address.length <= 62;
  }

  // Format address for display
  static formatAddress(address: string): string {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  }
}