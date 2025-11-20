import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    fontSize: 50,
    fontWeight: '900',
    color: '#d4af37', 
    letterSpacing: 10,
    marginBottom: 0,
    fontFamily: 'sans-serif',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#555',
    marginBottom: 60,
    fontStyle: 'italic',
  },
  loginButton: {
    backgroundColor: '#d4af37',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 30,
    shadowColor: '#b89429',
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d4af37',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 20,
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#d4af37',
    fontWeight: '600',
  },
});