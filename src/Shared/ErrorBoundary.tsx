import React, { ErrorInfo, ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import s from "./ErrorBoundary.style";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = {
		hasError: false,
		error: null,
		errorInfo: null,
	};

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error, errorInfo: null };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		this.setState({ error, errorInfo });
	}

	copyErrorDetailsToClipboard = () => {
		const { error, errorInfo } = this.state;
		const errorDetails = `Error: ${error?.toString()}\n\nError Info: ${errorInfo?.componentStack}`;
		console.log(errorDetails);
	};

	resetError = () => {
		this.setState({ hasError: false, error: null, errorInfo: null });
	};

	render() {
		if (this.state.hasError) {
			return (
				<View style={s.container}>
					<Text style={s.title}>Oops! Something went wrong.</Text>
					<TouchableOpacity style={s.button} onPress={this.copyErrorDetailsToClipboard}>
						<Text style={s.buttonText}>Print to Console</Text>
					</TouchableOpacity>
					<TouchableOpacity style={s.button} onPress={this.resetError}>
						<Text style={s.buttonText}>Close</Text>
					</TouchableOpacity>
				</View>
			);
		}

		return this.props.children;
	}
}
