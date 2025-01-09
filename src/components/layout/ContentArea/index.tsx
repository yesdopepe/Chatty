import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ContentArea: FC<Props> = ({ children }) => {
  return (
    <div className="xl:col-span-5 md:col-span-3 h-full overflow-y-auto round-lg">
      {children}
    </div>
  );
};

export default ContentArea;
