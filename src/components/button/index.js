export default function Button({ text, onClick }) {
  return (
    <button className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp dark:text-dark" onClick={onClick}>
      {text}
    </button>
  );
}
