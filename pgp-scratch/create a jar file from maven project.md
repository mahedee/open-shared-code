# Create a jar file from maven project and run using command


Yes, you can create a **Maven project** that bundles all of its dependencies into a single executable JAR file (also known as a "fat JAR" or "uber JAR") and then run it using the command line.

Here are the steps to create an executable JAR with dependencies and run it:

### Step 1: Add the Maven Assembly Plugin to Your `pom.xml`

The Maven Assembly Plugin helps in creating a JAR with dependencies bundled into it. Modify your `pom.xml` to include the plugin:

```xml
<project>
    ...
    <build>
        <plugins>
            <!-- Assembly Plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-assembly-plugin</artifactId>
                <version>3.3.0</version> <!-- You can use the latest version -->
                <configuration>
                    <archive>
                        <manifest>
                            <mainClass>com.yourpackage.MainClass</mainClass> <!-- Replace with your main class -->
                        </manifest>
                    </archive>
                    <descriptorRefs>
                        <descriptorRef>jar-with-dependencies</descriptorRef>
                    </descriptorRefs>
                </configuration>
                <executions>
                    <execution>
                        <id>make-assembly</id>
                        <phase>package</phase>
                        <goals>
                            <goal>single</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

Replace `com.yourpackage.MainClass` with the fully qualified name of your main class (the one containing the `public static void main(String[] args)` method).

### Step 2: Build the Project

Now, run the following Maven command to build the project and create a "fat JAR" file:

```bash
mvn clean package
```

This will create a JAR file in the `target` directory. It will have the suffix `-jar-with-dependencies.jar`. For example, if your project is called `myapp`, the output JAR might be named `myapp-1.0-SNAPSHOT-jar-with-dependencies.jar`.

### Step 3: Run the JAR File

You can run the generated JAR file from the command line using the `java -jar` command:

```bash
java -jar target/myapp-1.0-SNAPSHOT-jar-with-dependencies.jar
```

### Optional: Using `shade` Plugin (Alternative to Assembly Plugin)

You can also use the `maven-shade-plugin` to create a fat JAR. Here's how you can configure it:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>3.4.1</version> <!-- Use the latest version -->
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                    <configuration>
                        <transformers>
                            <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                                <mainClass>com.yourpackage.MainClass</mainClass> <!-- Replace with your main class -->
                            </transformer>
                        </transformers>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

To build the project using the shade plugin, simply run:

```bash
mvn clean package
```

The shaded JAR will be located in the `target` directory, and you can run it the same way as:

```bash
java -jar target/myapp-1.0-SNAPSHOT.jar
```

### Summary
- Use **maven-assembly-plugin** or **maven-shade-plugin** to package your project with all dependencies into a single JAR.
- Run the JAR using `java -jar <jar-file>`.