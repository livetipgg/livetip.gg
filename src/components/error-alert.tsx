export const ErrorAlert = ({ error }: { error: string }) => {
  return (
    <div className="text-red-500 border text-sm p-2 border-red-500 rounded bg-red-50 dark:bg-red-800/40 dark:text-red-300  text-center mt-2">
      {error}
    </div>
  );
};
