import React, { Component, ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.log("🔥 Global Error:", error);
        console.log("📍 Error Info:", errorInfo)
    }

    handleReset = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        Something went wrong 😢
                    </Text>

                    <TouchableOpacity
                        onPress={this.handleReset}
                        style={{
                            marginTop: 20,
                            padding: 12,
                            backgroundColor: "#3B82F6",
                            borderRadius: 8,
                        }}
                    >
                        <Text style={{ color: "#fff" }}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}