import React from 'react'
import { 
    View,
    Button,
    AsyncStorage,
    Text,
    TextInput,
    StyleSheet
} from 'react-native'
import _APIsignUp from '../API/signup'

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading : false,
            errorMessage: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPwd: ''
        }
    }

    static navigationOptions = {
        title: 'Sign up here',
    };
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.globalForm}>
                <View style={styles.form}>
                        <Text>Enter your first name:</Text>
                        <TextInput 
                            style={styles.textinput} 
                            placeholder='Email'
                            onChangeText={(e) => this._setFirstName(e)}
                        />
                    </View>
                <View style={styles.form}>
                        <Text>Enter your last name:</Text>
                        <TextInput 
                            style={styles.textinput} 
                            placeholder='Email'
                            onChangeText={(e) => this._setLastName(e)}
                        />
                    </View>
                    <View style={styles.form}>
                        <Text>Enter a valid email:</Text>
                        <TextInput 
                            style={styles.textinput} 
                            placeholder='Email'
                            onChangeText={(e) => this._setEmail(e)}
                        />
                    </View>
                    <View style={styles.form}>
                        <Text>Choose a good password:</Text>
                        <TextInput 
                            style={styles.textinput} 
                            secureTextEntry={true} 
                            placeholder='Password'
                            onChangeText= {(e) => this._setPassword(e)}
                        />
                    </View>
                    <View style={styles.form}>
                        <Text>And confirm your password:</Text>
                        <TextInput 
                            style={styles.textinput} 
                            secureTextEntry={true} 
                            placeholder='Confirm Password'
                            onChangeText= {(e) => this._setConfirmPwd(e)}
                        />
                    </View>
                    <View style={styles.error}>
                        {this._displayError()}
                    </View>
                    
                </View>
                
                <Button
                    buttonStyle={styles.button}
                    backgroundColor="#03A9F4"
                    textStyle={{ color: "#bcbec1" }}
                    title="Sign Up"
                    disabled={this._buttonIsDisabled()}
                    onPress={this._signUpAsync}
                />
            </View>
        )
    }

    _displayError(){
        //console.log('Update error message.')
        var message = ''

        if (this.state.errorMessage=='emailIsEmpty') {
            message = 'Email cannot be blank.'
        }
        if (this.state.errorMessage=='confirmPwdIsWrong') {
            message = 'Passwords must be equals.'
        }
        if (this.state.errorMessage=='pwdIsEmpty') {
            message = 'Passwords cannot be blank.'
        }
        if (this.state.errorMessage=='serverErrorWrongEmail') {
            message = 'Wrong email.'
        }
        return(
            <Text style= {{color: '#9e1818'}}>{message}</Text>
        )
    }

    _buttonIsDisabled() {
        let res = false;
        if (this.state.errorMessage !== '') {
            res = true
        }
        return res
    }

    _setEmail(e) { // on ne va pas verifier l'email, c'est fait en back
        if (e) {
            e = String(e).toLowerCase() 
            this.setState({
                email: e
            })
        } else {
            this.setState({errorMessage: 'emailIsEmpty'})
        }
    }

    _setPassword(e) {
        this.setState({
            password: e
        })
    }

    _setFirstName(e) {
        this.setState({
            firstName: e
        })
    }

    _setLastName(e) {
        this.setState({
            lastName: e
        })
    }

    _setConfirmPwd(e) {
        if (this.state.password !== e){
            this.setState({errorMessage: 'confirmPwdIsWrong'})
        } else {
            this.setState({errorMessage: ''})
            this.setState({
                confirmPwd: e
            })
        }
    }

    _signUpAsync = async () => {
        if (this.state.email == '' ){
            this.setState({errorMessage: 'emailIsEmpty'})
        } else if (this.state.password == '') {
            this.setState({errorMessage: 'pwdIsEmpty'})
        } else if (this.state.errorMessage !== '') {
            console.log('Cannot sign up !')
        } else {
            _APIsignUp(
                this.state.email,
                this.state.password,
                this.state.confirmPwd,
                this.state.firstName,
                this.state.lastName
                ).then( async (res) => {
                    if (res.success) { // si res n'est pas false
                        await AsyncStorage.setItem('userToken', res.token); // on stock le token de la db dans la memoire du tel
                        this.props.navigation.navigate('App'); // puis on va vers l'app
                    } else {
                        this.setState({errorMessage: 'serverErrorWrongEmail'}) //le seul cas pas gere ici c'est avec un mauvais email, mais c'est pris en compte dans le server, qui renvoie une erreur
                    }
                })
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:20 
    },
    globalForm: {
        marginTop: 20,
        flex: 0.9,
    },form: {
        flex: 0.20,
        justifyContent: 'center'
    },
    textinput: {
        flex: 0.8,
        marginTop: 20,
        marginBottom: 10,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 12
    },
    error: {
        flex: 0.2,
        marginTop: 25,
        alignItems: 'center'
    },
    button: {
        flex: 1,
        paddingVertical: 20, 
        margin: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }

  });

export default SignUp