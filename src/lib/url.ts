import { APP_URL } from '@/lib/client-old';

export default function withAppURL(path: string) {
  return APP_URL + path;
}
