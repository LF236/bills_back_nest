export class CreateLogDto {
  user_id: string | null;
  user_name: string;
  action: string;
  module: string;
  resource: string;
  description: string;
  result: 'success' | 'error' | 'warning';
  message_error?: string;
  duration?: number | null;
}