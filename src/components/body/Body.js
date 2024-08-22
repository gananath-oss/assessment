import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PharmacyImg from "../../img/pharmacy.png";

function Body() {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Row>
        <Col xs={5}>
          <h1 style={{ color: "#2596be", fontWeight: 700, marginTop: "4rem" }}>
            PHARMACY
          </h1>
          <h3 style={{ color: "#4ba7a8", fontWeight: 300 }}>Landing Page</h3>
          <p style={{ fontSize: "10px" }}>
            Welcome to ABC Pharmacy, your trusted partner in health and
            wellness. At ABC Pharmacy, we are committed to providing top-quality
            pharmaceutical services and a wide range of healthcare products to
            meet your needs.
            <br /> <br />
            Our knowledgeable and friendly staff are here to assist you in
            finding the right solutions for your health concerns. Whether you're
            looking for prescription medications, over-the-counter remedies, or
            personal care products, we've got you covered..
          </p>
        </Col>
        <Col xs={7}>
          <img
            src={PharmacyImg}
            alt="Main Image"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Body;
