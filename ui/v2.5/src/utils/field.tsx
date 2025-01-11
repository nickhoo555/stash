import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ExternalLink } from "src/components/Shared/ExternalLink";
import { TruncatedText } from "src/components/Shared/TruncatedText";
import { Icon } from "src/components/Shared/Icon";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

interface ITextField {
  id?: string;
  name?: string;
  abbr?: string | null;
  value?: string | null;
  truncate?: boolean | null;
}

export const TextField: React.FC<ITextField> = ({
  id,
  name,
  value,
  abbr,
  truncate,
  children,
}) => {
  if (!value && !children) {
    return null;
  }

  const message = (
    <>{id ? <FormattedMessage id={id} defaultMessage={name} /> : name}:</>
  );

  return (
    <>
      <dt>{abbr ? <abbr title={abbr}>{message}</abbr> : message}</dt>
      <dd>
        {value ? truncate ? <TruncatedText text={value} /> : value : children}
      </dd>
    </>
  );
};

interface IURLFieldProps extends IFieldProps {
  url?: string;
  value?: string;
  target?: string;
  internal?: boolean;
  showCopy?: boolean;
}

export const URLField: React.FC<IURLFieldProps> = ({
  id,
  name,
  value,
  url,
  abbr,
  truncate,
  target = "_blank",
  internal,
  showCopy,
}) => {
  if (!value) {
    return null;
  }

  const message = (
    <>{id ? <FormattedMessage id={id} defaultMessage={name} /> : name}:</>
  );

  function maybeRenderUrl() {
    if (!url) return;

    const children = truncate ? <TruncatedText text={value} /> : value;

    if (internal) {
      return (
        <Link to={url} target={target}>
          {children}
        </Link>
      );
    } else {
      return (
        <ExternalLink href={url} target={target}>
          {children}
        </ExternalLink>
      );
    }
  }

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
    }
  };

  return (
    <>
      <dt>{abbr ? <abbr title={abbr}>{message}</abbr> : message}</dt>
      <dd className="d-flex field-value-container">
        {maybeRenderUrl()}
        {showCopy && value && (
          <Button
            variant="secondary"
            size="sm"
            className="ml-2"
            title="复制"
            onClick={handleCopy}
          >
            <Icon icon={faCopy} />
          </Button>
        )}
      </dd>
    </>
  );
};

interface IURLsField {
  id?: string;
  name?: string;
  abbr?: string | null;
  urls?: string[] | null;
  truncate?: boolean | null;
  target?: string;
  // an internal link (uses <Link to={url}>)
  internal?: boolean;
}

export const URLsField: React.FC<IURLsField> = ({
  id,
  name,
  urls,
  abbr,
  truncate,
  target = "_blank",
  internal,
}) => {
  if (!urls || !urls.length) {
    return null;
  }

  const message = (
    <>{id ? <FormattedMessage id={id} defaultMessage={name} /> : name}:</>
  );

  const renderUrls = () => {
    return urls.map((url, i) => {
      if (!url) return;

      const children = truncate ? <TruncatedText text={url} /> : url;

      if (internal) {
        return (
          <Link key={i} to={url} target={target}>
            {children}
          </Link>
        );
      } else {
        return (
          <ExternalLink key={i} href={url} target={target}>
            {children}
          </ExternalLink>
        );
      }
    });
  };

  return (
    <>
      <dt>{abbr ? <abbr title={abbr}>{message}</abbr> : message}</dt>
      <dd>
        <dl>{renderUrls()}</dl>
      </dd>
    </>
  );
};
