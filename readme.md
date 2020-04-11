# Safe proxy

## What we will cover

- What is a safe proxy?
- Why would we want one?
- A basic example

## Notes

I recently started reading Build Secure & Reliable Systems [1].

In the book they describe how Google's Site reliability engineers (SRE's) use proxy hosts to reduce human error in production environments.

The ideas is that humans create outages.
Sometimes due to mistakes and sometimes due to malicious intent.
By adopting what they call a "Zero Touch Prod" approach to interacting with production environments these issues can be reduced.

The developer who wants to make a change in a production environment uses a custom CLI instead of something like ssh.
This CLI talks to a proxy server that will validate and execute the command provided to the CLI.

If the proxy decides that everything is safe the command runs.
By doing this advanced policies can be introduced to stop mistakes from happening.

The book also describes that some commands need approval from a trusted party.
These commands are submitted for review by another engineer before execution.

## References

[1] https://static.googleusercontent.com/media/landing.google.com/en//sre/static/pdf/SRS.pdf
