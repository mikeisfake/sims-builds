import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Details = ({ build }) => {

    const { cost, customContent, features, lotSize, lotType, world } = build;

    const featuresList = features.map(feature => {
        return <li key={feature}>{feature}</li>
    })

    const creatorsList = customContent && customContent.map(creator => {
        return <li key={creator}>{creator.toLowerCase()}</li>
    })
  return (
    <>
      <section>
        <FontAwesomeIcon icon="globe-europe" fixedWidth className="icon"/> {world} <br />
        <FontAwesomeIcon icon="border-all" fixedWidth className="icon"/> {lotSize} <br />
        <FontAwesomeIcon icon="home" fixedWidth className="icon"/> {lotType} <br />
        <FontAwesomeIcon icon="money-bill" fixedWidth className="icon"/> {`§${cost.toLocaleString()}.00`}{" "}
        <br />
      </section>

      <section>
        <span>build features</span>
        <ul className="features-list">{featuresList}</ul>
      </section>

      {customContent && 
      <section>
        <span>Custom Content Creators</span>
        <ul className="cc-list">{creatorsList}</ul>
      </section>
      }

    </>
  );
};
