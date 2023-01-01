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
import { useState } from "react";

export default function App() {
    const [text, setText] = useState("");

    const [todos, setTodos] = useState([]);
    console.log(todos);

    const newTodos = {
        id: Date.now(),
        text,
        isDone: false,
        isEdit: false,
        category: "javascript",
    };

    const onSubmitInput = () => {
        setTodos((prev) => [...prev, newTodos]);
    };

    return (
        // 노치 제거
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
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
                    <View style={styles.input_area}>
                        <TextInput
                            value={text}
                            style={styles.todo_input}
                            placeholder={"Enter your task"}
                            onChangeText={setText}
                            onSubmitEditing={() => onSubmitInput()}
                        />
                    </View>
                </View>
                {/* 스크롤 영역 */}
                <ScrollView style={styles.scroll_area}>
                    {/* 한개의 투두 */}
                    <View style={styles.once_todo}>
                        {/* 텍스트 */}
                        <Text style={{ fontSize: 18, width: "60%" }}>안뇽</Text>
                        {/* 아이콘 영역 */}
                        <View style={styles.once_icon_area}>
                            {/* 체크 아이콘 (isDone) */}
                            <TouchableOpacity style={styles.once_icon}>
                                <AntDesign
                                    name="checksquareo"
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                            {/* 수정 아이콘 (isEdit) */}
                            <TouchableOpacity style={styles.once_icon}>
                                <Entypo
                                    name="new-message"
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                            {/* 삭제 아이콘 (delete) */}
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
    input_area: {
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
