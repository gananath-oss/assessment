import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentBg from "../../img/bgImage.jpg";

function Body() {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Row>
        <Col xs={5}>
          <h1 style={{ color: "#2596be", fontWeight: 700, marginTop: "4rem" }}>
            XYZ Acadamy
          </h1>
          <h3 style={{ color: "#4ba7a8", fontWeight: 300 }}>Landing Page</h3>
          <p style={{ fontSize: "15px" }}>
            Welcome to XYZ Student Results Portal, your reliable source for
            academic achievements. At XYZ, we are dedicated to providing
            accurate and timely access to student results and academic records.
            <br /> <br />
            Our user-friendly platform ensures that you can easily navigate
            through your grades and performance summaries. Whether you’re
            checking semester results, final grades, or cumulative GPAs, we’re
            here to support your academic journey.
          </p>
        </Col>
        <Col xs={7}>
          <img
            src={StudentBg}
            alt="Student Background"
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
