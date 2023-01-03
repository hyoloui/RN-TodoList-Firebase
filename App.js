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
import { useEffect, useState } from "react";
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
    const [editText, setEditText] = useState("");

    const newTodo = {
        // id: Date.now(),
        text,
        isDone: false,
        isEdit: false,
        category,
        createAt: Date.now(),
    };

    // Create API--------------------------------------------------
    const onSubmitInput = async () => {
        try {
            await addDoc(collection(db, "todos"), newTodo);
            setText(""); // input
        } catch (e) {
            console.error("Error adding todos: ", e);
        }
    };
    // const onSubmitInput = () => {
    //     setTodos((prev) => [...prev, newTodos]);
    // };

    // Read API---------------------------------------------------
    useEffect(() => {
        const q = query(collection(db, "todos"), orderBy("createAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const newTodos = snapshot.docs.map((doc) => {
                const newTodo = {
                    id: doc.id,
                    ...doc.data(),
                };
                return newTodo;
            });
            setTodos(newTodos);
        });
    }, []);

    // Update API--------------------------------------------------
    const setDone = async (id) => {
        const find = todos.findIndex((todo) => todo.id === id);
        await updateDoc(doc(db, "todos", id), { isDone: !todos[find].isDone });
    };

    const setEdit = async (id) => {
        const find = todos.findIndex((todo) => todo.id === id);
        await updateDoc(doc(db, "todos", id), { isEdit: !todos[find].isEdit });
    };
    const editTodo = async (id) => {
        await updateDoc(doc(db, "todos", id), {
            text: editText,
            isEdit: false,
        });
    };

    // Delete API--------------------------------------------------

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
                    {todos.map((todo) => {
                        if (category === todo.category) {
                            return (
                                /* 한개의 투두 */
                                <View key={todo.id} style={styles.once_todo}>
                                    {todo.isEdit ? (
                                        <TextInput
                                            defaultValue={todo.text}
                                            onChangeText={setEditText}
                                            onSubmitEditing={() => {
                                                editTodo(todo.id);
                                            }}
                                            style={{
                                                flex: 1,
                                                backgroundColor: "white",
                                                fontSize: 18,
                                            }}
                                        />
                                    ) : (
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                width: "60%",
                                                textDecorationLine: todo.isDone
                                                    ? "line-through"
                                                    : "none",
                                            }}
                                        >
                                            {todo.text}
                                        </Text>
                                    )}
                                    {/* 아이콘 영역 */}
                                    <View style={styles.once_icon_area}>
                                        {/* 체크 아이콘 (isDone) */}
                                        <TouchableOpacity
                                            style={styles.once_icon}
                                            onPress={() => setDone(todo.id)}
                                        >
                                            <AntDesign
                                                name="checksquareo"
                                                size={30}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                        {/* 수정 아이콘 (isEdit) */}
                                        <TouchableOpacity
                                            style={styles.once_icon}
                                            onPress={() => setEdit(todo.id)}
                                        >
                                            <Entypo
                                                name="new-message"
                                                size={30}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                        {/* 삭제 아이콘 (delete) */}
                                        <TouchableOpacity
                                            style={styles.once_icon}
                                            onPress={() => setDelete(todo.id)}
                                        >
                                            <FontAwesome
                                                name="trash-o"
                                                size={30}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }
                    })}
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
