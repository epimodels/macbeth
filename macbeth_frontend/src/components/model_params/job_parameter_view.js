import { Container } from "react-bootstrap";

export default function JobParameterView({ name, value, description }) {
  return (
    <Container style={{ "marginBottom": "15%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: 0 }}>{name}</h3>
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "lightgrey",
            width: "150px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {value}
        </div>
      </div>
      <p style={{ marginTop: 0, textAlign: "right" }}>{description}</p>
    </Container>
  );
}
