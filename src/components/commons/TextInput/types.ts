export interface TextInputProps {
  name: string;
  id?: string;
  required: boolean;
  onChange: React.FormEventHandler<HTMLInputElement>;
}
