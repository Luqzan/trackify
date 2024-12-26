import clsx from "clsx";

export default function StatsCard({
  header,
  data,
  footer,
  error,
}: {
  header: string;
  data: string;
  footer: string;
  error: boolean;
}) {
  return (
    <div className="flex-1 bg-gradient-to-b from-accent-dark to-accent-subtle py-4 px-4 rounded-xl max-h-[120px]">
      <h4 className="text-accent text-sm font-medium mb-1 text-nowrap">
        {header}
      </h4>
      <p
        className={clsx(
          "text-white text-3xl md:text-4xl font-bold tracking-wide mb-2",
          { "text-red-500": error }
        )}
      >
        {data}
      </p>
      <p className="text-white text-xs font-light">{footer}</p>
    </div>
  );
}
