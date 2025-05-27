public class MethodOverloading {
    public static int add(int a, int b) {
        return a + b;
    }

    public static double add(double a, double b) {
        return a + b;
    }

    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
        System.out.println("Sum of 2 integers: " + add(5, 10));
        System.out.println("Sum of 2 doubles: " + add(3.5, 4.5));
        System.out.println("Sum of 3 integers: " + add(1, 2, 3));
    }
}
