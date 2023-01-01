import { StatusBar } from "expo-status-bar";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";

export default function App() {
    return (
        // 노치 제거
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* 상태바 */}
                <StatusBar />
                {/* 고정 영역 */}
                <View>
                    {/* 버튼 영역 */}
                    <View style={styles.buttonArea}>
                        <TouchableOpacity style={styles.category_btn}>
                            <Text style={{ fontSize: 20 }}>Javascript</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.category_btn}>
                            <Text style={{ fontSize: 20 }}>React</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.category_btn}>
                            <Text style={{ fontSize: 20 }}>Coding test</Text>
                        </TouchableOpacity>
                    </View>
                    {/* input */}
                    <View style={styles.inpuut_area}>
                        <TextInput
                            style={styles.todo_input}
                            placeholder={"안녕"}
                        />
                    </View>
                </View>
                {/* 스크롤 영역 */}
                <ScrollView style={styles.scroll_area}>
                    <View style={styles.once_todo}>
                        <Text style={{ fontSize: 18, width: "60%" }}>
                            안뇽안뇽안뇽안뇽안뇽안뇽dkssdfjikodcsvn안뇽안뇽안뇽안뇽안뇽안뇽dkssdfjikodcsvn
                        </Text>
                        <View style={styles.once_icon_area}>
                            <TouchableOpacity style={styles.once_icon}>
                                <AntDesign
                                    name="checksquareo"
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.once_icon}>
                                <Entypo
                                    name="new-message"
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.once_icon}>
                                <FontAwesome
                                    name="trash-o"
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    buttonArea: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    category_btn: {
        width: "30%",
        height: 50,
        backgroundColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
    },
    inpuut_area: {
        marginVertical: 20,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    todo_input: {
        padding: 10,
        bakcgroundColor: "white",
        borderWidth: 1,
    },
    //
    scroll_area: {
        backgroundColor: "red",
    },
    once_todo: {
        padding: 10,
        backgroundColor: "#ccc",
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    once_icon_area: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    once_icon: {
        paddingLeft: 15,
    },
});
