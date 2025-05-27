import java.sql.*;

public class BasicJDBCConnection {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/testdb"; // Your DB URL
        String user = "root";
        String password = "password";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");  // Load driver
            Connection conn = DriverManager.getConnection(url, user, password);

            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM students");

            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id") + ", Name: " + rs.getString("name"));
            }

            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
