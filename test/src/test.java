import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public class test {
    private LocalDateTime time;

    public static void main(String[] args) {
        String test="test";
        String[] orgIds = test.split(",");
        System.out.println(Arrays.toString(orgIds));
        System.out.println(orgIds[0]);
    }

}
