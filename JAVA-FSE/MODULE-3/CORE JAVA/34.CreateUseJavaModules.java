// com.utils
module com.utils {
    exports com.utils;
}
/ In com.utils.Utility.java
package com.utils;
public class Utility {
    public static void greet() {
        System.out.println("Hello from Utility");
    }
}

// In com.greetings
module com.greetings {
    requires com.utils;
}

// In com.greetings.Main.java
package com.greetings;
import com.utils.Utility;
public class Main {
    public static void main(String[] args) {
        Utility.greet();
    }
}
