import java.sql.*;

public class TransactionExample {
    private static final String URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String USER = "root";
    private static final String PASSWORD = "password";

    public static void transferMoney(int fromAccount, int toAccount, double amount) {
        String debitSql = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
        String creditSql = "UPDATE accounts SET balance = balance + ? WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
            conn.setAutoCommit(false);  // Start transaction

            try (PreparedStatement debitStmt = conn.prepareStatement(debitSql);
                 PreparedStatement creditStmt = conn.prepareStatement(creditSql)) {

                debitStmt.setDouble(1, amount);
                debitStmt.setInt(2, fromAccount);
                debitStmt.executeUpdate();

                creditStmt.setDouble(1, amount);
                creditStmt.setInt(2, toAccount);
                creditStmt.executeUpdate();

                conn.commit();
                System.out.println("Transfer successful");
            } catch (SQLException e) {
                conn.rollback();
                System.out.println("Transfer failed, rolled back");
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        transferMoney(101, 102, 500);
    }
}
