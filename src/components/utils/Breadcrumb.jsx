import Link from "next/link";
import { Breadcrumbs } from "@mantine/core";
import classEase from "classease";

const Breadcrumb = ({ title, items, classNames }) => {
  return (
    <div className={classEase("pageTop", classNames?.root)}>
      {title && <h3>{title}</h3>}

      <Breadcrumbs>
        {items &&
          items.map((item, index) =>
            item.hasOwnProperty("href") ? (
              <Link key={index} href={item.href}>
                {item?.title && item.title}
              </Link>
            ) : (
              <span key={index}>{item?.title && item.title}</span>
            )
          )}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
