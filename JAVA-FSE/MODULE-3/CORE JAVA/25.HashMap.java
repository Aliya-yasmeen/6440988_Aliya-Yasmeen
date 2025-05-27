import java.util.HashMap;
import java.util.Scanner;

public class HashMapExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        HashMap<Integer, String> studentMap = new HashMap<>();

        System.out.println("Enter student ID and name (type -1 to stop):");
        while (true) {
            System.out.print("ID: ");
            int id = sc.nextInt();
            if (id == -1) break;
            sc.nextLine(); // consume newline
            System.out.print("Name: ");
            String name = sc.nextLine();
            studentMap.put(id, name);
        }

        System.out.print("Enter ID to retrieve name: ");
        int searchId = sc.nextInt();
        String studentName = studentMap.get(searchId);
        if (studentName != null) {
            System.out.println("Name: " + studentName);
        } else {
            System.out.println("Student ID not found.");
        }
        sc.close();
    }
}
