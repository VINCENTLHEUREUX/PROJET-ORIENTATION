export interface Formation {
  id: number;
  code: string;  // This will be uppercase (e.g., "GOL", "LOG")
  titre: string;
  description: string;
  url: string;
  applicationUrl: string;
  credits: number;
}
