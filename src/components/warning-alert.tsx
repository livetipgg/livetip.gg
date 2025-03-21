export const WarningAlert = ({ error }: { error: string | undefined }) => {
  return (
    <div className="text-yellow-600 border text-sm p-2 border-yellow-600 rounded bg-yellow-50 dark:bg-yellow-800/40 dark:text-yellow-300  text-center mt-2">
      {error}
    </div>
  );
};
