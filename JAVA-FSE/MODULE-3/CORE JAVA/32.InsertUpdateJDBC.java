import java.sql.*;

public class StudentDAO {
    private static final String URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String USER = "root";
    private static final String PASSWORD = "password";

    public void insertStudent(int id, String name) {
        String sql = "INSERT INTO students (id, name) VALUES (?, ?)";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.setString(2, name);
            ps.executeUpdate();
            System.out.println("Inserted student: " + name);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void updateStudentName(int id, String newName) {
        String sql = "UPDATE students SET name = ? WHERE id = ?";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, newName);
            ps.setInt(2, id);
            ps.executeUpdate();
            System.out.println("Updated student ID " + id + " to " + newName);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        StudentDAO dao = new StudentDAO();
        dao.insertStudent(1, "Aliya");
        dao.updateStudentName(1, "Aliya Yasmeen");
    }
}
