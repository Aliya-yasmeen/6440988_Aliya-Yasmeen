import java.lang.reflect.*;

public class ReflectionExample {
    public void greet(String name) {
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args) throws Exception {
        Class<?> clazz = Class.forName("ReflectionExample");
        Method[] methods = clazz.getDeclaredMethods();

        for (Method method : methods) {
            System.out.println("Method: " + method.getName());
            Class<?>[] params = method.getParameterTypes();
            System.out.print("Parameters: ");
            for (Class<?> param : params) {
                System.out.print(param.getName() + " ");
            }
            System.out.println();
        }

        Object obj = clazz.getDeclaredConstructor().newInstance();
        Method greetMethod = clazz.getMethod("greet", String.class);
        greetMethod.invoke(obj, "Aliya");
    }
}
