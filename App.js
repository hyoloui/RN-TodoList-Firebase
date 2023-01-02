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
import {
    onSnapshot,
    query,
    collection,
    doc,
    orderBy,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "./Firebase";

export default function App() {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState([]);
    const [category, setCategory] = useState("javascript");

    const newTodos = {
        id: Date.now(),
        text,
        isDone: false,
        isEdit: false,
        category: "javascript",
        createAt: Date.now(),
    };

    // Create API-------------------------------------------------------------------------
    const onSubmitInput = async () => {
        try {
            const createDoc = await addDoc(collection(db, "todos"), newTodos);
            console.log("Document written todos: ", createDoc);
        } catch (e) {
            console.error("Error adding todos: ", e);
        }
    };
    // const onSubmitInput = () => {
    //     setTodos((prev) => [...prev, newTodos]);
    // };

    // Read API-------------------------------------------------------------------------

    // Update API-------------------------------------------------------------------------

    // Delete API-------------------------------------------------------------------------

    return (
        // 노치 제거
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* 고정 영역 */}
                <View>
                    {/* 버튼 영역 */}
                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            style={{
                                ...styles.category_btn,
                                backgroundColor:
                                    category === "javascript"
                                        ? "#f5aa42"
                                        : "#ccc",
                            }}
                            onPress={() => setCategory("javascript")}
                        >
                            <Text style={{ fontSize: 20 }}>Javascript</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                ...styles.category_btn,
                                backgroundColor:
                                    category === "react" ? "#f5aa42" : "#ccc",
                            }}
                            onPress={() => setCategory("react")}
                        >
                            <Text style={{ fontSize: 20 }}>React</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                ...styles.category_btn,
                                backgroundColor:
                                    category === "coding-test"
                                        ? "#f5aa42"
                                        : "#ccc",
                            }}
                            onPress={() => setCategory("coding-test")}
                        >
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
        flex: 1,
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
