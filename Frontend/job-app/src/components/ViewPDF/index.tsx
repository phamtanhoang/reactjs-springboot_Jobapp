import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const ViewPDF = () => (
  <Document>
    <Page
      size="A4"
      style={styles.page}
      ref={"../../assets/cv/164a2db6-c178-47ea-85b4-01baf64b8b73.pdf"}
    ></Page>
  </Document>
);
export default ViewPDF;
