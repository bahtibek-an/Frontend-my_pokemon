export interface PokeCardProps {
  image?: string;
  name: string;
  subname?: string;
  onClickDelete?: (name: string) => void;
}
