// Server
import java.net.*;
import java.io.*;

public class Server {
    public static void main(String[] args) throws Exception {
        ServerSocket ss = new ServerSocket(1234);
        Socket s = ss.accept();
        BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
        PrintWriter pw = new PrintWriter(s.getOutputStream(), true);
        pw.println("Welcome client!");
        System.out.println("Client says: " + br.readLine());
        ss.close();
    }
}
// Client
import java.net.*;
import java.io.*;

public class Client {
    public static void main(String[] args) throws Exception {
        Socket s = new Socket("localhost", 1234);
        BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
        PrintWriter pw = new PrintWriter(s.getOutputStream(), true);
        System.out.println(br.readLine());
        pw.println("Hello Server!");
        s.close();
    }
}